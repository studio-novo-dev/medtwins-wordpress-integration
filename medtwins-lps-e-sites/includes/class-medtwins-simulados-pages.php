<?php
if ( ! defined( 'ABSPATH' ) ) { exit; }

final class MedTwins_LPs_Simulados_Pages {
	private const OPTION = 'medtwins_lps_simulados_config';
	private const GROUP = 'medtwins_lps_simulados';
	private static $public_pages = null;

	public static function init(): void {
		add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'register_routes' ) );
	}

	private static function plugin_file(): string {
		return dirname( __DIR__ ) . '/medtwins-lps-e-sites.php';
	}

	private static function defaults(): array {
		return json_decode( (string) file_get_contents( dirname( __DIR__ ) . '/assets/simulados-defaults.json' ), true );
	}

	public static function is_page( string $id ): bool {
		return array_key_exists( $id, self::defaults()['paginas'] );
	}

	public static function endpoint(): string {
		return rest_url( 'medtwins-lps/v1/simulados-config' );
	}

	private static function fields(): array {
		$fields = array();
		$labels = array(
			'nacional' => 'Simulado Nacional — 100 questões',
			'pediatria' => 'Pediatria', 'ginecologia-obstetricia' => 'Ginecologia e Obstetrícia',
			'cirurgia' => 'Cirurgia', 'preventiva-saude-coletiva' => 'Medicina Preventiva e Saúde Coletiva',
			'clinica-medica' => 'Clínica Médica', 'simulado-geral' => 'Simulado Geral',
		);
		foreach ( $labels as $id => $label ) {
			$fields[ 'link_' . $id ] = array( 'label' => $label, 'type' => 'url', 'section' => 'Destinos das provas', 'placeholder' => 'https://...' );
		}
		foreach ( array( 'cem' => '100 questões', 'seis-areas' => '6 simulados' ) as $id => $label ) {
			$section = 'Campanha — ' . $label;
			$fields[ 'data_' . $id ] = array( 'label' => 'Data', 'type' => 'text', 'section' => $section, 'placeholder' => 'Ex.: 13 de dezembro' );
			$fields[ 'horario_' . $id ] = array( 'label' => 'Horário de liberação', 'type' => 'text', 'section' => $section, 'placeholder' => 'Ex.: às 8h' );
			$fields[ 'form_' . $id ] = array( 'label' => 'Nome do formulário no RD Station', 'type' => 'text', 'section' => $section, 'placeholder' => 'simulado medtwins v2' );
		}
		foreach ( array(
			'simulado-nacional' => 'LP de cadastro — 100 questões',
			'simulado-nacional-liberacao' => 'Página de acesso — 100 questões',
			'simulado-nacional-6-areas' => 'LP de cadastro — 6 simulados',
			'simulado-nacional-6-areas-liberacao' => 'Página de acesso — 6 simulados',
		) as $id => $label ) {
			$fields[ 'pagina_' . $id ] = array( 'label' => $label, 'type' => 'url', 'section' => 'URLs públicas das quatro páginas (opcional)', 'placeholder' => 'Automático: shortcode publicado ou index.html do pacote' );
		}
		$fields['rd_script'] = array( 'label' => 'Carregador do RD Station', 'type' => 'script', 'section' => 'Integração RD Station', 'placeholder' => 'https://.../loader.js' );
		return $fields;
	}

	private static function clean_url( $value, bool $script = false ): string {
		if ( ! is_string( $value ) ) { return ''; }
		$value = trim( $value );
		if ( '' === $value || preg_match( '/[\x00-\x20\\\\]/', $value ) ) { return ''; }
		if ( ! $script && preg_match( '~^/(?!/)~', $value ) ) { return esc_url_raw( $value, array( 'http', 'https' ) ); }
		$parts = wp_parse_url( $value );
		if ( ! is_array( $parts ) || empty( $parts['host'] ) || isset( $parts['user'] ) || isset( $parts['pass'] ) ) { return ''; }
		if ( ! in_array( strtolower( $parts['scheme'] ?? '' ), $script ? array( 'https' ) : array( 'http', 'https' ), true ) ) { return ''; }
		return esc_url_raw( $value, $script ? array( 'https' ) : array( 'http', 'https' ) );
	}

	public static function register_settings(): void {
		register_setting( self::GROUP, self::OPTION, array( 'type' => 'array', 'default' => array(), 'sanitize_callback' => array( __CLASS__, 'sanitize' ) ) );
	}

	public static function sanitize( $input ): array {
		$saved = get_option( self::OPTION, array() );
		$output = is_array( $saved ) ? array_intersect_key( $saved, self::fields() ) : array();
		$input = is_array( $input ) ? $input : array();
		foreach ( self::fields() as $key => $field ) {
			if ( ! array_key_exists( $key, $input ) ) { continue; }
			if ( ! is_string( $input[ $key ] ) ) {
				add_settings_error( self::OPTION, $key, 'Valor inválido em ' . $field['label'] . '. O anterior foi mantido.' );
				continue;
			}
			$value = trim( $input[ $key ] );
			if ( 'text' === $field['type'] ) {
				$output[ $key ] = sanitize_text_field( $value );
			} else {
				$clean = self::clean_url( $value, 'script' === $field['type'] );
				if ( '' !== $value && '' === $clean ) {
					add_settings_error( self::OPTION, $key, 'URL inválida em ' . $field['label'] . '. A anterior foi mantida.' );
					continue;
				}
				$output[ $key ] = $clean;
			}
		}
		return $output;
	}

	/** Detecta shortcodes no editor e nos dados salvos pelo Elementor. */
	private static function scan_shortcodes( $content, string $url ): void {
		if ( is_array( $content ) ) {
			foreach ( $content as $value ) { self::scan_shortcodes( $value, $url ); }
			return;
		}
		if ( ! is_string( $content ) || false === strpos( $content, '[medtwins_pagina' ) ) { return; }
		preg_match_all( '/' . get_shortcode_regex( array( 'medtwins_pagina' ) ) . '/s', $content, $matches, PREG_SET_ORDER );
		foreach ( $matches as $match ) {
			if ( '[' === $match[1] && ']' === $match[6] ) { continue; }
			$attrs = shortcode_parse_atts( $match[3] );
			$id = is_array( $attrs ) && isset( $attrs['id'] ) ? $attrs['id'] : '';
			if ( self::is_page( $id ) && ! isset( self::$public_pages[ $id ] ) ) { self::$public_pages[ $id ] = $url; }
		}
	}

	private static function public_page( string $id ): string {
		if ( null === self::$public_pages ) {
			self::$public_pages = array();
			foreach ( get_posts( array( 'post_type' => 'page', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'ID', 'order' => 'ASC' ) ) as $page ) {
				$url = get_permalink( $page );
				self::scan_shortcodes( $page->post_content, $url );
				self::scan_shortcodes( json_decode( (string) get_post_meta( $page->ID, '_elementor_data', true ), true ), $url );
			}
		}
		return self::$public_pages[ $id ] ?? plugins_url( 'paginas/' . $id . '/index.html', self::plugin_file() );
	}

	public static function get_config(): array {
		$config = self::defaults();
		$saved = get_option( self::OPTION, array() );
		$saved = is_array( $saved ) ? $saved : array();
		$legacy = get_option( 'medtwins_liberacao_config', array() );
		$legacy = is_array( $legacy ) ? $legacy : array();
		foreach ( $config['links'] as $id => $default ) {
			$legacy_id = 'nacional' === $id ? 'simulado-geral' : $id;
			$old = isset( $legacy[ $legacy_id ] ) && is_array( $legacy[ $legacy_id ] ) ? self::clean_url( $legacy[ $legacy_id ]['url'] ?? '' ) : '';
			$config['links'][ $id ] = self::clean_url( $saved[ 'link_' . $id ] ?? '' ) ?: ( $old ?: $default );
		}
		foreach ( $config['campanhas'] as $id => &$campaign ) {
			$campaign['data'] = sanitize_text_field( is_string( $saved[ 'data_' . $id ] ?? null ) ? $saved[ 'data_' . $id ] : '' );
			$campaign['horario'] = sanitize_text_field( is_string( $saved[ 'horario_' . $id ] ?? null ) ? $saved[ 'horario_' . $id ] : '' );
			$campaign['form_name'] = sanitize_text_field( is_string( $saved[ 'form_' . $id ] ?? null ) ? $saved[ 'form_' . $id ] : '' ) ?: $campaign['form_name'];
		}
		unset( $campaign );
		foreach ( $config['paginas'] as $id => $_ ) {
			$config['paginas'][ $id ] = self::clean_url( $saved[ 'pagina_' . $id ] ?? '' ) ?: self::public_page( $id );
		}
		$config['rd_script'] = self::clean_url( $saved['rd_script'] ?? '', true ) ?: $config['rd_script'];
		return $config;
	}

	public static function register_routes(): void {
		register_rest_route( 'medtwins-lps/v1', '/simulados-config', array( 'methods' => 'GET', 'permission_callback' => '__return_true', 'callback' => array( __CLASS__, 'response' ) ) );
	}

	public static function response() {
		$response = rest_ensure_response( self::get_config() );
		$response->header( 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0' );
		return $response;
	}

	public static function render_admin(): void {
		if ( ! current_user_can( 'manage_options' ) ) { return; }
		$saved = get_option( self::OPTION, array() );
		$saved = is_array( $saved ) ? $saved : array();
		$config = self::get_config();
		?>
		<h2>Novos Simulados Nacionais — páginas e destinos</h2>
		<p>Os links já apontam para as provas existentes. Nacional e Geral usam inicialmente a mesma prova de 100 questões. Vazio em um destino reaproveita o cronograma antigo ou o endereço padrão.</p>
		<p>As LPs levam automaticamente à respectiva página de acesso. As URLs públicas são detectadas por shortcode, inclusive no Elementor; sem uma página publicada, o fluxo usa o index.html do pacote.</p>
		<p>Data e horário vazios ficam ocultos nas LPs. Os exemplos são somente placeholders. O carregador RD abaixo é o já utilizado pela MedTwins; a automação de e-mail continua sendo gerenciada no RD Station.</p>
		<?php settings_errors( self::OPTION ); ?>
		<form action="options.php" method="post">
		<?php settings_fields( self::GROUP ); ?>
		<?php $section = ''; foreach ( self::fields() as $key => $field ) : ?>
			<?php if ( $section !== $field['section'] ) : ?>
				<?php if ( '' !== $section ) { echo '</tbody></table>'; } $section = $field['section']; ?>
				<h3><?php echo esc_html( $section ); ?></h3><table class="form-table" role="presentation"><tbody>
			<?php endif; ?>
			<?php
			$value = $saved[ $key ] ?? '';
			if ( 0 === strpos( $key, 'link_' ) ) { $value = $config['links'][ substr( $key, 5 ) ]; }
			if ( 0 === strpos( $key, 'form_' ) ) { $value = $config['campanhas'][ substr( $key, 5 ) ]['form_name']; }
			if ( 'rd_script' === $key ) { $value = $config['rd_script']; }
			?>
			<tr><th scope="row"><label for="<?php echo esc_attr( 'mt-sim-' . $key ); ?>"><?php echo esc_html( $field['label'] ); ?></label></th>
			<td><input class="large-text" type="text" id="<?php echo esc_attr( 'mt-sim-' . $key ); ?>" name="<?php echo esc_attr( self::OPTION . '[' . $key . ']' ); ?>" value="<?php echo esc_attr( is_string( $value ) ? $value : '' ); ?>" placeholder="<?php echo esc_attr( $field['placeholder'] ); ?>"></td></tr>
		<?php endforeach; ?></tbody></table>
		<?php submit_button( 'Salvar configurações dos simulados' ); ?>
		</form>
		<?php
	}
}

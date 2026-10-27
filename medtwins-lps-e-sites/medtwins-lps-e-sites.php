<?php
/**
 * Plugin Name: MedTwins LPs e Sites
 * Description: Publica landing pages e sites da MedTwins por shortcode, com isolamento visual do tema.
 * Version: 1.3.0
 * Author: MedTwins
 * Text Domain: medtwins-lps-e-sites
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class MedTwins_LPs_E_Sites {
	private const SHORTCODE = 'medtwins_pagina';
	private const DESTINATIONS_OPTION = 'medtwins_lps_home_destinos';
	private static $paginas = null;

	public static function init(): void {
		add_shortcode( self::SHORTCODE, array( __CLASS__, 'render_shortcode' ) );
		add_action( 'admin_menu', array( __CLASS__, 'register_admin_page' ) );
		add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
	}

	private static function destination_fields(): array {
		return array(
			'primeira-etapa' => array( 'label' => 'Quero me preparar para a 1ª etapa', 'default' => '' ),
			'segunda-etapa' => array( 'label' => 'Quero treinar para a 2ª etapa', 'default' => '' ),
			'start' => array( 'label' => 'Conhecer o START MedTwins', 'default' => '' ),
			'preparacao-teorica' => array( 'label' => 'Conhecer a preparação teórica', 'default' => '' ),
			'treinamento-pratico' => array( 'label' => 'Conhecer o treinamento prático', 'default' => '' ),
			'nossa-historia' => array( 'label' => 'Conhecer nossa história', 'default' => '' ),
			'depoimentos' => array( 'label' => 'Ver depoimentos dos alunos', 'default' => '' ),
			'whatsapp' => array( 'label' => 'Tirar minhas dúvidas no WhatsApp', 'default' => '' ),
			'equipe' => array( 'label' => 'Falar com a equipe MedTwins', 'default' => '' ),
			'instagram' => array( 'label' => 'Instagram', 'default' => 'https://instagram.com/medtwinss' ),
			'facebook' => array( 'label' => 'Facebook', 'default' => 'https://facebook.com/medtwinss' ),
			'youtube' => array( 'label' => 'YouTube', 'default' => 'https://youtube.com/@medtwinsrevalida' ),
			'privacidade' => array( 'label' => 'Políticas de Privacidade', 'default' => '' ),
			'termos' => array( 'label' => 'Termos de Uso', 'default' => '' ),
		);
	}

	/** Aceita HTTP(S), caminhos a partir da raiz e âncoras da própria home. */
	private static function clean_destination( $value ): string {
		if ( ! is_string( $value ) ) {
			return '';
		}
		$value = trim( $value );
		if ( '' === $value || preg_match( '/[\x00-\x20\\\\]/', $value ) ) {
			return '';
		}
		if ( '#' === substr( $value, 0, 1 ) || preg_match( '~^/(?!/)~', $value ) ) {
			return esc_url_raw( $value, array( 'http', 'https' ) );
		}
		$parts = wp_parse_url( $value );
		if ( ! is_array( $parts ) || empty( $parts['host'] ) || ! in_array( strtolower( $parts['scheme'] ?? '' ), array( 'http', 'https' ), true ) || isset( $parts['user'] ) || isset( $parts['pass'] ) ) {
			return '';
		}
		return esc_url_raw( $value, array( 'http', 'https' ) );
	}

	public static function get_destinations(): array {
		$saved = get_option( self::DESTINATIONS_OPTION, array() );
		$saved = is_array( $saved ) ? $saved : array();
		$result = array();
		foreach ( self::destination_fields() as $id => $field ) {
			$result[ $id ] = self::clean_destination( $saved[ $id ] ?? $field['default'] );
		}
		return $result;
	}

	public static function register_settings(): void {
		register_setting( 'medtwins_lps_destinos', self::DESTINATIONS_OPTION, array(
			'type' => 'array',
			'sanitize_callback' => array( __CLASS__, 'sanitize_destinations' ),
			'default' => array(),
		) );
	}

	public static function sanitize_destinations( $input ): array {
		$input = is_array( $input ) ? $input : array();
		$result = self::get_destinations();
		foreach ( self::destination_fields() as $id => $field ) {
			if ( ! array_key_exists( $id, $input ) ) {
				continue;
			}
			$value = self::clean_destination( $input[ $id ] );
			if ( '' === $value && ( ! is_string( $input[ $id ] ) || '' !== trim( $input[ $id ] ) ) ) {
				add_settings_error( self::DESTINATIONS_OPTION, 'destino_' . $id, sprintf( 'Link inválido em "%s". O valor anterior foi mantido.', $field['label'] ) );
				continue;
			}
			$result[ $id ] = $value;
		}
		return $result;
	}

	public static function register_rest_routes(): void {
		register_rest_route( 'medtwins-lps/v1', '/home-destinos', array(
			'methods' => 'GET',
			'callback' => array( __CLASS__, 'get_destinations_response' ),
			'permission_callback' => '__return_true',
		) );
	}

	public static function get_destinations_response() {
		$response = rest_ensure_response( self::get_destinations() );
		$response->header( 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0' );
		return $response;
	}

	private static function page_url( array $pagina ): string {
		if ( MedTwins_LPs_Simulados_Pages::is_page( $pagina['id'] ) ) {
			return add_query_arg( 'mt_simulados', MedTwins_LPs_Simulados_Pages::endpoint(), $pagina['url'] );
		}
		return 'medtwins-home' === $pagina['id']
			? add_query_arg( 'mt_destinos', rest_url( 'medtwins-lps/v1/home-destinos' ), $pagina['url'] )
			: $pagina['url'];
	}

	/** Descobre somente pacotes locais em paginas/<id>/. */
	public static function get_paginas(): array {
		if ( null !== self::$paginas ) {
			return self::$paginas;
		}
		self::$paginas = array();
		foreach ( glob( plugin_dir_path( __FILE__ ) . 'paginas/*/manifest.json' ) ?: array() as $manifest ) {
			$directory = dirname( $manifest );
			$id = basename( $directory );
			$data = json_decode( (string) file_get_contents( $manifest ), true );
			if ( ! preg_match( '/^[a-z0-9]+(?:-[a-z0-9]+)*$/', $id ) || ! is_array( $data ) || ! is_file( $directory . '/index.html' ) ) {
				continue;
			}
			self::$paginas[ $id ] = array(
				'id' => $id,
				'titulo' => sanitize_text_field( is_string( $data['titulo'] ?? null ) ? $data['titulo'] : $id ),
				'tipo' => sanitize_text_field( is_string( $data['tipo'] ?? null ) ? $data['tipo'] : 'lp' ),
				'versao' => sanitize_text_field( is_string( $data['versao'] ?? null ) ? $data['versao'] : '1.0.0' ),
				'arquivo' => $directory . '/index.html',
				'url' => plugins_url( 'paginas/' . rawurlencode( $id ) . '/index.html', __FILE__ ),
			);
		}
		ksort( self::$paginas );
		return self::$paginas;
	}

	public static function render_shortcode( $attributes ): string {
		$attributes = shortcode_atts(
			array( 'id' => 'medtwins-simulados', 'modo' => 'tela', 'altura' => '100vh', 'largura_total' => 'sim' ),
			(array) $attributes,
			self::SHORTCODE
		);
		$id = sanitize_key( (string) $attributes['id'] );
		$paginas = self::get_paginas();
		if ( ! isset( $paginas[ $id ] ) ) {
			return current_user_can( 'edit_posts' ) ? '<p class="medtwins-pagina-erro">' . esc_html( sprintf( 'Página MedTwins "%s" não encontrada.', $id ) ) . '</p>' : '';
		}

		$pagina = $paginas[ $id ];
		$altura = strtolower( trim( (string) $attributes['altura'] ) );
		if ( ! preg_match( '/^[0-9]+(?:\.[0-9]+)?(?:px|vh|dvh|svh|rem|em|%)$/', $altura ) ) {
			$altura = '100vh';
		}
		$tela = 'conteudo' !== strtolower( trim( (string) $attributes['modo'] ) );
		$full = in_array( strtolower( (string) $attributes['largura_total'] ), array( 'sim', '1', 'true', 'yes' ), true );
		$classes = 'medtwins-pagina' . ( $tela ? ' medtwins-pagina--tela' : ( $full ? ' medtwins-pagina--full' : '' ) );
		$query = array( 'v' => $pagina['versao'] . '-' . filemtime( $pagina['arquivo'] ) );
		// Preserva atribuição das campanhas sem repassar parâmetros arbitrários do WordPress.
		foreach ( $_GET as $key => $value ) {
			if ( is_string( $key ) && is_string( $value ) && preg_match( '/^(utm_[a-z0-9_]+|gclid|fbclid|msclkid)$/i', $key ) ) {
				$query[ $key ] = sanitize_text_field( wp_unslash( $value ) );
			}
		}
		$url = add_query_arg( $query, self::page_url( $pagina ) );
		wp_enqueue_script( 'medtwins-lps-e-sites', plugins_url( 'assets/embed.js', __FILE__ ), array(), '1.0.0', true );

		static $styles_printed = false;
		$styles = '';
		if ( ! $styles_printed ) {
			$styles_printed = true;
			$styles = '<style>'
				. 'html.medtwins-pagina-tela,html.medtwins-pagina-tela body{overflow:hidden!important;}'
				. '.medtwins-pagina{position:relative;width:100%;line-height:0;background:#0c2027;}'
				. '.medtwins-pagina--full{width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);}'
				. '.medtwins-pagina--tela{position:fixed;z-index:99990;top:var(--wp-admin--admin-bar--height,0px);right:0;bottom:0;left:0;width:auto;max-width:none;height:auto;margin:0;}'
				. '.medtwins-pagina__frame{display:block;width:100%;max-width:none;border:0;background:#0c2027;}'
				. '.medtwins-pagina--tela .medtwins-pagina__frame{height:100%!important;}'
				. '</style>';
		}
		return $styles . sprintf(
			'<div class="%1$s"><iframe class="medtwins-pagina__frame" src="%2$s" title="%3$s" style="height:%4$s" loading="eager" allow="autoplay; fullscreen; picture-in-picture" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>',
			esc_attr( $classes ), esc_url( $url ), esc_attr( $pagina['titulo'] ), esc_attr( $tela ? '100%' : $altura )
		);
	}

	public static function register_admin_page(): void {
		add_management_page( 'MedTwins LPs e Sites', 'MedTwins LPs e Sites', 'manage_options', 'medtwins-lps-e-sites', array( __CLASS__, 'render_admin_page' ) );
	}

	public static function render_admin_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		?>
		<div class="wrap">
			<h1>MedTwins — LPs e Sites</h1>
			<p>Crie uma página no WordPress, preferencialmente com o modelo Elementor Canvas, e insira o shortcode correspondente.</p>
			<table class="widefat striped">
				<thead><tr><th>Página</th><th>Tipo</th><th>Versão</th><th>Shortcode</th><th>Prévia do pacote</th></tr></thead>
				<tbody>
				<?php foreach ( self::get_paginas() as $pagina ) : ?>
					<tr>
						<td><?php echo esc_html( $pagina['titulo'] ); ?></td>
						<td><?php echo esc_html( $pagina['tipo'] ); ?></td>
						<td><?php echo esc_html( $pagina['versao'] ); ?></td>
						<td><code><?php echo esc_html( '[medtwins_pagina id="' . $pagina['id'] . '"]' ); ?></code></td>
						<td><a href="<?php echo esc_url( self::page_url( $pagina ) ); ?>" target="_blank" rel="noopener noreferrer">Abrir prévia</a></td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
			<h2>Destinos do site institucional</h2>
			<p>Defina os links dos botões e das redes sociais da home. Aceita URL completa (https://...), caminho do site (/pagina/) ou âncora da home (#depoimentos). Deixe vazio para manter o botão sem destino.</p>
			<p>WhatsApp: use <code>https://wa.me/55DDDNUMERO</code>, substituindo pelo telefone com código do país e DDD, somente números.</p>
			<?php settings_errors( self::DESTINATIONS_OPTION ); ?>
			<form action="options.php" method="post">
				<?php settings_fields( 'medtwins_lps_destinos' ); ?>
				<?php $destinations = self::get_destinations(); ?>
				<table class="form-table" role="presentation">
					<?php foreach ( self::destination_fields() as $id => $field ) : ?>
					<tr>
						<th scope="row"><label for="<?php echo esc_attr( 'mt-destino-' . $id ); ?>"><?php echo esc_html( $field['label'] ); ?></label></th>
						<td><input class="large-text" type="text" id="<?php echo esc_attr( 'mt-destino-' . $id ); ?>" name="<?php echo esc_attr( self::DESTINATIONS_OPTION . '[' . $id . ']' ); ?>" value="<?php echo esc_attr( $destinations[ $id ] ); ?>" placeholder="https://..."></td>
					</tr>
					<?php endforeach; ?>
				</table>
				<?php submit_button( 'Salvar destinos do site' ); ?>
			</form>
			<?php MedTwins_LPs_Simulados_Pages::render_admin(); ?>
			<h2>Adicionar outra LP ou site</h2>
			<p>Adicione uma pasta em <code>paginas/id-da-pagina/</code> com <code>index.html</code>, <code>manifest.json</code> e os arquivos da página. Use IDs em minúsculas, com números e hífens.</p>
			<p>Para incorporar no conteúdo: <code>[medtwins_pagina id="medtwins-simulados" modo="conteudo" altura="900px" largura_total="nao"]</code>.</p>
			<p>O modo padrão <code>tela</code> ocupa a área visível e mantém a rolagem dentro da página incorporada.</p>
		</div>
		<?php
	}
}

require_once __DIR__ . '/includes/class-medtwins-simulados-pages.php';
MedTwins_LPs_E_Sites::init();
MedTwins_LPs_Simulados_Pages::init();

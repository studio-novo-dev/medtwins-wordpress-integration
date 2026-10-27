<?php
/**
 * Plugin Name: MedTwins Simulados
 * Description: Publica experiências interativas da MedTwins por shortcode, com isolamento visual do tema.
 * Version: 1.6.2
 * Author: MedTwins
 * Text Domain: medtwins-simulados
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

final class MedTwins_Simulados {
	private const VERSION = '1.6.2';
	private const SHORTCODE = 'medtwins_simulado';
	private const CALENDAR_SHORTCODE = 'medtwins_calendario';
	private const RELEASE_SHORTCODE = 'medtwins_liberacao';
	private const RELEASE_OPTION = 'medtwins_liberacao_config';

	/** @var array<string, array<string, string>>|null */
	private static $simulados = null;

	public static function init(): void {
		add_shortcode( self::SHORTCODE, array( __CLASS__, 'render_shortcode' ) );
		add_shortcode( self::CALENDAR_SHORTCODE, array( __CLASS__, 'render_calendar_shortcode' ) );
		add_shortcode( self::RELEASE_SHORTCODE, array( __CLASS__, 'render_release_shortcode' ) );
		add_action( 'admin_init', array( __CLASS__, 'register_settings' ) );
		add_action( 'admin_menu', array( __CLASS__, 'register_admin_page' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
	}

	/**
	 * Descobre automaticamente os pacotes em simulados/<id>/manifest.json.
	 *
	 * @return array<string, array<string, string>>
	 */
	public static function get_simulados(): array {
		if ( null !== self::$simulados ) {
			return self::$simulados;
		}

		self::$simulados = array();
		$manifests       = glob( plugin_dir_path( __FILE__ ) . 'simulados/*/manifest.json' );

		if ( false === $manifests ) {
			return self::$simulados;
		}

		foreach ( $manifests as $manifest_path ) {
			$directory = dirname( $manifest_path );
			$id        = sanitize_key( basename( $directory ) );
			$data      = json_decode( (string) file_get_contents( $manifest_path ), true );

			if ( ! is_array( $data ) || ! is_file( $directory . '/index.html' ) ) {
				continue;
			}

			self::$simulados[ $id ] = array(
				'id'      => $id,
				'titulo'  => sanitize_text_field( $data['titulo'] ?? $id ),
				'tipo'    => sanitize_text_field( $data['tipo'] ?? 'simulado' ),
				'versao'  => sanitize_text_field( $data['versao'] ?? '1.0.0' ),
				'arquivo' => $directory . '/index.html',
				'url'     => plugins_url( 'simulados/' . rawurlencode( $id ) . '/index.html', __FILE__ ),
			);
		}

		ksort( self::$simulados );
		return self::$simulados;
	}

	/**
	 * Renderiza [medtwins_simulado id="pediatria"].
	 *
	 * @param array<string, mixed> $attributes Atributos do shortcode.
	 */
	public static function render_shortcode( $attributes ): string {
		$attributes = shortcode_atts(
			array(
				'id'            => 'pediatria',
				'altura'        => '100vh',
				'largura_total' => 'sim',
				'modo'          => 'tela',
			),
			(array) $attributes,
			self::SHORTCODE
		);

		$id        = sanitize_key( (string) $attributes['id'] );
		$simulados = self::get_simulados();

		if ( ! isset( $simulados[ $id ] ) ) {
			if ( current_user_can( 'edit_posts' ) ) {
				return '<div class="medtwins-simulado-erro">' . esc_html( sprintf( 'Simulado "%s" não encontrado.', $id ) ) . '</div>';
			}
			return '';
		}

		$altura = strtolower( trim( (string) $attributes['altura'] ) );
		if ( ! preg_match( '/^[0-9]+(?:\.[0-9]+)?(?:px|vh|dvh|svh|rem|em|%)$/', $altura ) ) {
			$altura = '100vh';
		}

		$screen_mode = 'tela' === strtolower( trim( (string) $attributes['modo'] ) );
		$full_width  = in_array( strtolower( (string) $attributes['largura_total'] ), array( '1', 'sim', 'yes', 'true' ), true );
		$classes    = 'medtwins-simulado';
		if ( $screen_mode ) {
			$classes .= ' medtwins-simulado--screen';
		} elseif ( $full_width ) {
			$classes .= ' medtwins-simulado--full';
		}

		$simulado = $simulados[ $id ];
		$version  = rawurlencode( $simulado['versao'] . '-' . (string) filemtime( $simulado['arquivo'] ) );
		$url      = add_query_arg( 'v', $version, $simulado['url'] );
		if ( 'cronograma-liberacao' === $id ) {
			$url = add_query_arg( 'mt_endpoint', rest_url( 'medtwins/v1/liberacao' ), $url );
		}

		static $styles_printed = false;
		$styles = '';
		if ( ! $styles_printed ) {
			$styles_printed = true;
			$styles = '<style>'
				. 'html.medtwins-simulado-page,html.medtwins-simulado-page body{overflow:hidden!important;}'
				. '.medtwins-simulado{position:relative;width:100%;line-height:0;background:#F5F6F2;}'
				. '.medtwins-simulado--full{width:100vw;max-width:100vw;margin-left:calc(50% - 50vw);margin-right:calc(50% - 50vw);}'
				. '.medtwins-simulado--screen{position:fixed;z-index:99990;top:var(--wp-admin--admin-bar--height,0px);right:0;bottom:0;left:0;width:auto;max-width:none;height:auto;margin:0;}'
				. '.medtwins-simulado__frame{display:block;width:100%;min-height:680px;border:0;background:#F5F6F2;}'
				. '.medtwins-simulado--screen .medtwins-simulado__frame{height:100%!important;min-height:0;}'
				. '.medtwins-simulado-erro{padding:16px;border-left:4px solid #c93636;background:#fff3f3;color:#6b1111;}'
				. '</style>';
		}

		$screen_script = '';
		if ( 'cronograma-liberacao' === $id ) {
			$screen_script .= '<script>window.MedTwinsReleaseConfig=' . wp_json_encode( self::get_release_config(), JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT ) . ';</script>';
		}
		if ( $screen_mode ) {
			$screen_script .= '<script>(function(){document.documentElement.classList.add("medtwins-simulado-page");if(document.body){document.body.classList.add("medtwins-simulado-page");}}());</script>';
		}

		return $styles . $screen_script . sprintf(
			'<div class="%1$s"><iframe class="medtwins-simulado__frame" src="%2$s" title="%3$s" style="height:%4$s" loading="eager" allow="fullscreen" referrerpolicy="strict-origin-when-cross-origin"></iframe></div>',
			esc_attr( $classes ),
			esc_url( $url ),
			esc_attr( $simulado['titulo'] ),
			esc_attr( $screen_mode ? '100%' : $altura )
		);
	}

	/**
	 * Renderiza [medtwins_calendario] como atalho para o calendário editorial.
	 *
	 * @param array<string, mixed> $attributes Atributos do shortcode.
	 */
	public static function render_calendar_shortcode( $attributes ): string {
		$attributes       = (array) $attributes;
		$attributes['id'] = 'calendario-medtwins';

		return self::render_shortcode( $attributes );
	}

	/**
	 * Renderiza [medtwins_liberacao].
	 *
	 * @param array<string, mixed> $attributes Atributos do shortcode.
	 */
	public static function render_release_shortcode( $attributes ): string {
		$attributes       = (array) $attributes;
		$attributes['id'] = 'cronograma-liberacao';

		return self::render_shortcode( $attributes );
	}

	/** @return array<string, array<string, string|bool>> */
	private static function release_defaults(): array {
		return array(
			'pediatria'                 => array( 'titulo' => 'Pediatria', 'data' => '06/09', 'url' => '', 'checked' => false ),
			'ginecologia-obstetricia'   => array( 'titulo' => 'Ginecologia e Obstetrícia', 'data' => '07/09', 'url' => '', 'checked' => false ),
			'cirurgia'                  => array( 'titulo' => 'Cirurgia', 'data' => '08/09', 'url' => '', 'checked' => false ),
			'preventiva-saude-coletiva' => array( 'titulo' => 'Medicina Preventiva / Saúde Coletiva', 'data' => '09/09', 'url' => '', 'checked' => false ),
			'clinica-medica'            => array( 'titulo' => 'Clínica Médica', 'data' => '10/09', 'url' => '', 'checked' => false ),
			'simulado-geral'            => array( 'titulo' => 'Simulado Geral INEP', 'data' => '11/09', 'url' => '', 'checked' => false ),
		);
	}

	/** @return array<string, array<string, string|bool>> */
	private static function get_release_config(): array {
		$saved = get_option( self::RELEASE_OPTION, array() );
		$saved = is_array( $saved ) ? $saved : array();
		$result = self::release_defaults();

		foreach ( $result as $id => $defaults ) {
			if ( isset( $saved[ $id ] ) && is_array( $saved[ $id ] ) ) {
				$result[ $id ]['url']     = esc_url_raw( (string) ( $saved[ $id ]['url'] ?? '' ) );
				$result[ $id ]['checked'] = ! empty( $saved[ $id ]['checked'] );
			}
		}

		return $result;
	}

	public static function register_settings(): void {
		register_setting(
			'medtwins_simulados_settings',
			self::RELEASE_OPTION,
			array(
				'type'              => 'array',
				'sanitize_callback' => array( __CLASS__, 'sanitize_release_config' ),
				'default'           => array(),
			)
		);
	}

	public static function register_rest_routes(): void {
		register_rest_route(
			'medtwins/v1',
			'/liberacao',
			array(
				'methods'             => 'GET',
				'callback'            => array( __CLASS__, 'get_release_rest_response' ),
				'permission_callback' => '__return_true',
			)
		);
	}

	/** @return WP_REST_Response */
	public static function get_release_rest_response() {
		$response = rest_ensure_response( self::get_release_config() );
		$response->header( 'Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0' );

		return $response;
	}

	/**
	 * @param mixed $input Dados enviados pelo formulário.
	 * @return array<string, array<string, string|bool>>
	 */
	public static function sanitize_release_config( $input ): array {
		$input  = is_array( $input ) ? $input : array();
		$output = array();

		foreach ( self::release_defaults() as $id => $defaults ) {
			$row = isset( $input[ $id ] ) && is_array( $input[ $id ] ) ? $input[ $id ] : array();
			$output[ $id ] = array(
				'url'     => esc_url_raw( (string) ( $row['url'] ?? '' ) ),
				'checked' => ! empty( $row['checked'] ),
			);
		}

		return $output;
	}

	public static function register_admin_page(): void {
		add_management_page(
			'MedTwins Simulados',
			'MedTwins Simulados',
			'manage_options',
			'medtwins-simulados',
			array( __CLASS__, 'render_admin_page' )
		);
	}

	public static function render_admin_page(): void {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$simulados = self::get_simulados();
		?>
		<div class="wrap">
			<h1>MedTwins — Experiências interativas</h1>
			<p>Insira o shortcode em uma página. O modo tela isola a experiência do cabeçalho, do rodapé e dos estilos do tema.</p>
			<table class="widefat striped" style="max-width:1000px">
				<thead><tr><th>Experiência</th><th>Tipo</th><th>ID</th><th>Versão</th><th>Shortcode</th></tr></thead>
				<tbody>
				<?php foreach ( $simulados as $simulado ) : ?>
					<?php
					$shortcode = '[medtwins_simulado id="' . $simulado['id'] . '"]';
					if ( 'calendario' === $simulado['tipo'] ) {
						$shortcode = '[medtwins_calendario]';
					} elseif ( 'cronograma-liberacao' === $simulado['id'] ) {
						$shortcode = '[medtwins_liberacao]';
					}
					?>
					<tr>
						<td><?php echo esc_html( $simulado['titulo'] ); ?></td>
						<td><?php echo esc_html( ucfirst( $simulado['tipo'] ) ); ?></td>
						<td><code><?php echo esc_html( $simulado['id'] ); ?></code></td>
						<td><?php echo esc_html( $simulado['versao'] ); ?></td>
						<td><code><?php echo esc_html( $shortcode ); ?></code></td>
					</tr>
				<?php endforeach; ?>
				</tbody>
			</table>
			<h2>Configuração do cronograma de liberação</h2>
			<p>Defina o destino de cada botão e marque quais itens devem aparecer com o check verde.</p>
			<form action="options.php" method="post">
				<?php settings_fields( 'medtwins_simulados_settings' ); ?>
				<?php $release_config = self::get_release_config(); ?>
				<table class="widefat striped" style="max-width:1000px">
					<thead><tr><th>Data</th><th>Área</th><th style="width:110px">Check</th><th>Link do botão</th></tr></thead>
					<tbody>
					<?php foreach ( $release_config as $id => $item ) : ?>
						<tr>
							<td><?php echo esc_html( $item['data'] ); ?></td>
							<td><?php echo esc_html( $item['titulo'] ); ?></td>
							<td><label><input type="checkbox" name="<?php echo esc_attr( self::RELEASE_OPTION . '[' . $id . '][checked]' ); ?>" value="1" <?php checked( ! empty( $item['checked'] ) ); ?>> Exibir</label></td>
							<td><input class="large-text" type="url" placeholder="https://..." name="<?php echo esc_attr( self::RELEASE_OPTION . '[' . $id . '][url]' ); ?>" value="<?php echo esc_attr( $item['url'] ); ?>"></td>
						</tr>
					<?php endforeach; ?>
					</tbody>
				</table>
				<?php submit_button( 'Salvar cronograma' ); ?>
			</form>
			<h2>Como adicionar outra experiência</h2>
			<p>Adicione uma pasta dentro de <code>simulados</code> contendo <code>index.html</code> e <code>manifest.json</code>. O novo ID será o nome da pasta.</p>
		</div>
		<?php
	}
}

MedTwins_Simulados::init();

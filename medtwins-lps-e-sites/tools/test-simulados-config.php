<?php
// Executa as classes reais com substitutos das APIs WP; não altera WordPress.
define( 'ABSPATH', __DIR__ );
$options = array(); $hooks = array(); $routes = array(); $errors = array(); $allowed = true;
function add_action( $name, $callback ) { global $hooks; $hooks[$name][] = $callback; }
function add_shortcode( $name, $callback ) {}
function get_option( $key, $default = false ) { global $options; return $options[$key] ?? $default; }
function sanitize_text_field( $value ) { return trim( strip_tags( $value ) ); }
function esc_url_raw( $url, $protocols = null ) { return $url; }
function wp_parse_url( $url ) { return parse_url( $url ); }
function rest_url( $path ) { return 'https://wp.test/wp-json/' . $path; }
function plugins_url( $path, $file = null ) { return 'https://wp.test/wp-content/plugins/medtwins-lps-e-sites/' . $path; }
function plugin_dir_path( $file ) { return dirname( $file ) . '/'; }
function get_posts( $args ) { return array(
  (object) array( 'ID' => 1, 'post_content' => '[medtwins_pagina id="simulado-nacional"]' ),
  (object) array( 'ID' => 2, 'post_content' => '' ),
  (object) array( 'ID' => 3, 'post_content' => '[[medtwins_pagina id="simulado-nacional-6-areas"]]' ),
); }
function get_post_meta( $id, $key, $single ) { return 2 === $id ? '[{"settings":{"shortcode":"[medtwins_pagina id=\"simulado-nacional-liberacao\"]"}}]' : ''; }
function get_permalink( $post ) { return 'https://wp.test/pagina-' . $post->ID . '/'; }
function get_shortcode_regex( $tags = null ) { return '(\[?)\[(medtwins_pagina)\b([^\]]*)\](?:()(?:()))?(\]?)'; }
function shortcode_parse_atts( $input ) { preg_match( '/id="([^"]+)"/', $input, $m ); return isset( $m[1] ) ? array( 'id' => $m[1] ) : array(); }
function register_setting( $group, $key, $args ) { global $registered; $registered[$key] = $args; }
function add_settings_error( $key, $code, $message ) { global $errors; $errors[] = $code; }
function register_rest_route( $ns, $route, $args ) { global $routes; $routes[$ns . $route] = $args; }
function current_user_can( $cap ) { global $allowed; return $allowed; }
function esc_html( $s ) { return htmlspecialchars( (string) $s, ENT_QUOTES ); }
function esc_attr( $s ) { return esc_html( $s ); }
function esc_url( $s ) { return esc_html( $s ); }
function settings_errors( $option ) {}
function settings_fields( $group ) { echo '<input type="hidden" name="_wpnonce" value="test">'; }
function submit_button( $text ) { echo '<button>' . esc_html( $text ) . '</button>'; }
function add_management_page() {}
function shortcode_atts( $defaults, $attrs, $shortcode ) { return array_merge( $defaults, $attrs ); }
function sanitize_key( $value ) { return preg_replace( '/[^a-z0-9_-]/', '', strtolower( $value ) ); }
function wp_unslash( $value ) { return stripslashes( $value ); }
function wp_enqueue_script() {}
function add_query_arg( $args, $value = null, $url = null ) {
  if ( ! is_array( $args ) ) { $args = array( $args => $value ); } else { $url = $value; }
  return $url . ( false === strpos( $url, '?' ) ? '?' : '&' ) . http_build_query( $args );
}
class TestResponse {
  public $data; public $headers = array();
  public function __construct( $data ) { $this->data = $data; }
  public function header( $key, $value ) { $this->headers[$key] = $value; }
}
function rest_ensure_response( $data ) { return new TestResponse( $data ); }
function expect( $condition, $message ) { if ( ! $condition ) { throw new Exception( $message ); } }
require dirname( __DIR__ ) . '/medtwins-lps-e-sites.php';

$options['medtwins_liberacao_config'] = array(
  'pediatria' => array( 'url' => 'https://provas.test/pediatria/' ),
  'simulado-geral' => array( 'url' => 'https://provas.test/geral/' ),
);
$config = MedTwins_LPs_Simulados_Pages::get_config();
expect( 'https://provas.test/pediatria/' === $config['links']['pediatria'], 'Reaproveita link legado.' );
expect( 'https://provas.test/geral/' === $config['links']['nacional'], 'Nacional usa Geral legado.' );
expect( 'https://wp.test/pagina-1/' === $config['paginas']['simulado-nacional'], 'Detecta shortcode publicado.' );
expect( 'https://wp.test/pagina-2/' === $config['paginas']['simulado-nacional-liberacao'], 'Detecta shortcode Elementor.' );
expect( false !== strpos( $config['paginas']['simulado-nacional-6-areas'], '/paginas/simulado-nacional-6-areas/index.html' ), 'Ignora shortcode escapado e usa fallback estático.' );
expect( '' === $config['campanhas']['cem']['data'], 'Não publica data fictícia.' );
expect( 'simulado medtwins v2' === $config['campanhas']['cem']['form_name'], 'Preserva nome solicitado.' );

$options['medtwins_lps_simulados_config'] = array( 'link_nacional' => 'https://custom.test/nacional/', 'data_cem' => '10 de janeiro', 'unknown' => 'descartar' );
$clean = MedTwins_LPs_Simulados_Pages::sanitize( array(
 'link_nacional' => 'javascript:alert(1)', 'link_cirurgia' => '//malicioso.test/', 'link_pediatria' => 'https://user:pass@host.test/',
 'link_clinica-medica' => '/clinica/', 'data_cem' => '<b>20 de janeiro</b>', 'horario_cem' => '',
 'form_cem' => array( 'inválido' ), 'rd_script' => 'http://inseguro.test/script.js',
) );
expect( 'https://custom.test/nacional/' === $clean['link_nacional'], 'URL inválida mantém anterior.' );
expect( '/clinica/' === $clean['link_clinica-medica'], 'Aceita caminho do site.' );
expect( '20 de janeiro' === $clean['data_cem'], 'Sanitiza texto.' );
expect( ! isset( $clean['unknown'] ) && ! isset( $clean['rd_script'] ) && count( $errors ) === 5, 'Rejeita esquema, credenciais, tipo e script HTTP.' );
$options['medtwins_lps_simulados_config'] = $clean;
$config = MedTwins_LPs_Simulados_Pages::get_config();
expect( 'https://custom.test/nacional/' === $config['links']['nacional'], 'Nova configuração tem prioridade.' );
expect( '20 de janeiro' === $config['campanhas']['cem']['data'], 'Lê data salva.' );
MedTwins_LPs_Simulados_Pages::register_settings();
expect( is_callable( $registered['medtwins_lps_simulados_config']['sanitize_callback'] ), 'Callback registrado.' );
MedTwins_LPs_Simulados_Pages::register_routes();
expect( 'GET' === $routes['medtwins-lps/v1/simulados-config']['methods'], 'API pública somente leitura.' );
$response = MedTwins_LPs_Simulados_Pages::response();
expect( false !== strpos( $response->headers['Cache-Control'], 'no-store' ), 'Config não usa cache.' );
ob_start(); MedTwins_LPs_Simulados_Pages::render_admin(); $html = ob_get_clean();
expect( false !== strpos( $html, '_wpnonce' ) && false !== strpos( $html, 'placeholder="Ex.: 13 de dezembro"' ), 'Painel com nonce e exemplos.' );
expect( false !== strpos( $html, 'value="20 de janeiro"' ), 'Painel mostra configuração salva.' );
$allowed = false; ob_start(); MedTwins_LPs_Simulados_Pages::render_admin(); expect( '' === ob_get_clean(), 'Painel exige permissão.' ); $allowed = true;
expect( 6 === count( MedTwins_LPs_E_Sites::get_paginas() ), 'Catálogo tem 2 anteriores e 4 novas.' );
$_GET = array( 'utm_source' => 'teste', 'admin' => 'não repassar' );
$html = MedTwins_LPs_E_Sites::render_shortcode( array( 'id' => 'simulado-nacional' ) );
expect( false !== strpos( $html, 'mt_simulados=' ) && false !== strpos( $html, 'utm_source=' ) && false === strpos( $html, 'admin=' ), 'Shortcode repassa endpoint e UTMs.' );
$options['medtwins_lps_home_destinos'] = array( 'instagram' => 'https://instagram.com/conta-preservada' );
expect( 'https://instagram.com/conta-preservada' === MedTwins_LPs_E_Sites::get_destinations()['instagram'], 'Configuração da home preservada.' );
$home = MedTwins_LPs_E_Sites::render_shortcode( array( 'id' => 'medtwins-home' ) );
expect( false !== strpos( $home, 'mt_destinos=' ) && false === strpos( $home, 'mt_simulados=' ), 'Home mantém seu endpoint próprio.' );
$old_lp = MedTwins_LPs_E_Sites::render_shortcode( array( 'id' => 'medtwins-simulados' ) );
expect( false === strpos( $old_lp, 'mt_simulados=' ), 'LP anterior permanece independente.' );
if ( ! is_dir( dirname( __DIR__ ) . '/previews' ) ) { mkdir( dirname( __DIR__ ) . '/previews', 0777, true ); }
file_put_contents( dirname( __DIR__ ) . '/previews/simulados-config-test.json', json_encode( $config, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES ) );
echo "PASS PHP: catálogo, legado, prioridade, shortcodes/Elementor, sanitização, painel, permissão, API e shortcode.\n";


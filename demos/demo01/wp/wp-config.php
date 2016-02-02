<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, and ABSPATH. You can find more information by visiting
 * {@link http://codex.wordpress.org/Editing_wp-config.php Editing wp-config.php}
 * Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'dev_seatx');

/** MySQL database username */
define('DB_USER', 'dev');

/** MySQL database password */
define('DB_PASSWORD', 'JABITu545ij1');

/** MySQL hostname */
define('DB_HOST', 'gsub.pl');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'R%`|{v<{PPfN5Lz<=<7cAS3jTzTFO+U8y>pT~=x-h|R@6@mv^JnulZxq ouITIXT');
define('SECURE_AUTH_KEY',  '|DZ_|ht7c^oxg!hJJObTo+wb3vTIzrJw<`(&M k+|+N/`k= f9%NQoWjfd0MOG-V');
define('LOGGED_IN_KEY',    '[|wN7C4o(!O<`87s@|DC5.]v}Qm<bNu|gRc,&i;.n;TWvdZo#+^O?M,x9Uv~s6m)');
define('NONCE_KEY',        '|-ek=cf_8bJ5t2=2-Z_,waJ|p,=l(_:#)[~RkA93`3<hRU@Ep+$C@:,514UO7E/=');
define('AUTH_SALT',        '<k<.=0MN)M1amnI-OS%8wg=O%V/{tLmLUBj3Eh~SK9:FIE]c0P[abAOOKbfQ!W@z');
define('SECURE_AUTH_SALT', 'EsN3(ax-L<3)D7VYEFRj*]E-)WhE+1Z34-k!G[w6-HS0vw5( my|UlP=,-:5~1ep');
define('LOGGED_IN_SALT',   '^`_|e=zZxi=9-vEv`lDzHTi-6(ul+)^l+AO_|)R!Pg~{Rpgg&hZ+91{U+p~+LLrP');
define('NONCE_SALT',       ')|_iUSW.j]maSOzTTFDzT>H!YKttxU-%D>6^nJ`j@Ey`(W~M;y|lQ;5#m5U<G_#7');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

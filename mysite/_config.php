<?php

global $project;
$project = 'mysite';

global $databaseConfig;
$databaseConfig = array(
	'type' => 'MySQLDatabase',
	'server' => 'mariadb',
	'username' => 'root',
	'password' => 'root',
	'database' => 'simon_dictionary_ss',
	'path' => ''
);

// Set the site locale
i18n::set_locale('en_US');

<?php
    $db_host = '127.0.0.1';
    $db_user = 'root';
    $db_pass = '';
    $db_dbname = 'photoblog';

    $db_conn = new PDO("mysql:host=$db_host;dbname=$db_dbname;", $db_user, $db_pass);
?>
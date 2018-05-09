<?php
    header('Content-Type: text/plain');
    require('db.php');

    try{
        $db_query = $db_conn->prepare('SELECT * FROM users WHERE login=:login AND password=:password');
        $db_query->bindParam(':login', $_POST['login']);
        $password = md5($_POST['password']);
        $db_query->bindParam(':password', $password);
        $db_query->execute();

        $result = $db_query->fetchAll();
        if(!empty($result[0]['login'])){
            throw new Exception('Complete login', 0);
        }else{
            throw new Exception('Bad password or login', 1);
        }
    }catch(Exception $e){
        print($e->getCode());
    }
?>
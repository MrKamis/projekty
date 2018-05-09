<?php
    header('Content-Type: text/plain');
    require('db.php');

    try{
        $db_query = $db_conn->prepare('SELECT * FROM users WHERE login=:login');
        $db_query->bindParam(':login', $_POST['login']);
        $db_query->execute();
        $result = $db_query->fetchAll();

        if($result[0]['permissions'] > 4){

            $db_query = $db_conn->prepare('DELETE FROM listOfProjets WHERE git=:git');
            $db_query->bindParam(':git', $_POST['project']);
            if($db_query->execute()){
                throw new Exception('Complete', 0);
            }else{
                throw new Exception('Error?', 2);
            }

        }else{
            throw new Exception('No permissions', 1);
        }
    }catch(Exception $e){
        print($e->getCode());
    }
?>
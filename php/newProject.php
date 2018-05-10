<?php
    header('Content-Type: text/plain');
    require('db.php');

    $project = json_decode($_POST['project']);
    $db_query = $db_conn->prepare('INSERT INTO listOfProjets(title, author, version, last_modify, project_describe, href, git, tags, blocked) VALUES(:title, :author, :version, :lastmodify, :describe, :href, :git, :tags, 0)');

    $tags = json_encode(explode(',', $project->tags));
    $db_query->bindParam(':title', $project->title);
    $db_query->bindParam(':author', $project->author);
    $db_query->bindParam(':version', $project->version);
    $db_query->bindParam(':lastmodify', $project->last_modify);
    $db_query->bindParam(':describe', $project->describe);
    $db_query->bindParam(':href', $project->href);
    $db_query->bindParam(':git', $project->git);
    $db_query->bindParam(':tags', $tags);

    try{
        if($db_query->execute()){

            $db_query = $db_conn->prepare('SELECT * FROM users WHERE login=:login');
            $db_query->bindParam(':login', $_POST['login']);
            $db_query->execute();
            $result = $db_query->fetchAll();

            if($result[0]['permissions'] < 5){
                throw new Exception('No permissions', 2);
            }

            throw new Exception('Complete', 0);
        }else{
            throw new Exception('Error with inserting', 1);
            
        }
    }catch(Exception $e){
        print($e->getCode());
    }
?>
<?php
    header('Content-Type: text/plain');
    require('db.php');

    try{

        $db_query = $db_conn->prepare('SELECT * FROM users WHERE login=:login');
        $db_query->bindParam(':login', $_POST['login']);
        $db_query->execute();
        $result = $db_query->fetchAll();

        if($result[0]['permissions'] > 4){

            $project = json_decode($_POST['project']);
            $oldProject = json_decode($_POST['oldProject']);
            $oldGit = $oldProject->git;
            $db_query = $db_conn->prepare('SELECT * FROM listOfProjets WHERE git=:git');
            $db_query->bindParam(':git', $oldGit);
            $db_query->execute();

            $oldProjectTMP = $db_query->fetchAll();
            class Project{
                public $title;
                public $project_describe;
                public $git;
                public $href;
            };

            $oldProject = new Project();
            $oldProject->title = $oldProjectTMP[0]['title'];
            $oldProject->project_describe = $oldProjectTMP[0]['project_describe'];
            $oldProject->git = $oldProjectTMP[0]['git'];
            $oldProject->href = $oldProjectTMP[0]['href'];
            
            if(isset($project->newTitle)){
                $title = $project->newTitle;
            }else{
                $title = $oldProject->title;
            }

            if(isset($projecct->newGit)){
                $git = $proejct->newGit;
            }else{
                $git = $oldProject->git;
            }

            if(isset($project->newHref)){
                $href = $project->newHref;
            }else{
                $href = $oldProject->href;
            }

            if(isset($project->newDescribe)){
                $describe = $project->newDescribe;
            }else{
                $describe = $oldProject->project_describe;
            }

            $db_query = $db_conn->prepare('UPDATE listOfProjets SET title=:title, project_describe=:describe, href=:href, git=:git WHERE git=:git');
            $db_query->bindParam(':title', $title);
            $db_query->bindParam(':describe', $describe);
            $db_query->bindParam(':git', $git);
            $db_query->bindParam(':href', $href);
            
            if($db_query->execute()){
                throw new Exception('Complete', 0);
            }else{
                throw new Exception('Some error', 1);
            }

        }else{
            throw new Exception('No permissions', 2);
        }

    }catch(Exception $e){
        print($e->getCode());
    }
?>
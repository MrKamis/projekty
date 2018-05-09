<?php
    class Project{
        public $title;
        public $author;
        public $describe;
        public $version;
        public $last_modify;
        public $href;
        public $git;
        public $tags;
    }

    require_once('db.php');
    
    $db_query = $db_conn->prepare('SELECT * FROM listOfProjets WHERE blocked=0');
    $db_query->execute();
    $result = $db_query->fetchAll();

    $table = [];
    foreach($result as $item){
        
        $project = new Project();
        $project->title = $item['title'];
        $project->author = $item['author'];
        $project->describe = $item['project_describe'];
        $project->version = $item['version'];
        $project->last_modify = $item['last_modify'];
        $project->href = $item['href'];
        $project->git = $item['git'];
        $project->tags = $item['tags'];

        array_push($table, $project);

    }

    print(json_encode($table));
?>
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
?>
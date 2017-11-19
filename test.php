<?php
header('content-type:text/html;charset=utf-8');
try {
    $db = new PDO('mysql:host=127.0.0.1;dbname=homework', 'root', 'w');
    //查询
    $rows = $db->query('SELECT * from praiseThumb')->fetchAll(PDO::FETCH_ASSOC);
    $rs = array();
    print_r($rows);
} catch (PDOException $e) {
    print "Error!: " . $e->getMessage() . "<br/>";
    die();
}

 ?>

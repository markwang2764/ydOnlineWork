<?php
class Conmysql{
  public $servername;
  public $username;
  public $password;
  public $dbname;
  public $con = null;
  public function __construct($servername,$username,$password,$dbname){
    $this -> servername = $servername;
    $this -> username = $username;
    $this -> password = $password;
    $this -> dbname = $dbname;
  }
  public function getConnection()
  {
    try{
      $dsn= "mysql:host=$this->servername;dbname=$this->dbname";
      $this->con = new PDO($dsn, $this -> username, $this -> password);
    }
    catch(PDOException $e)
    {
      echo $e -> getMessage();
      die();
    }
  }
  public function updateDate($sql)
  {
    if($this->con==null){
      $this->getConnection();
    }
    //var_dump($this->con);
    header('content-type: application/json;charset=urf-8');
    $res = $this->con->exec($sql);
    $arr = array('result'=>$res);
    echo json_encode($arr);
    $this -> closeCon();
  }
  public function closeCon()
  {
    $this->con=null;
  }
}
class realConn extends Conmysql{
  public function __construct($servername, $username, $password, $dbname){
    parent::__construct($servername, $username, $password, $dbname);
  }
  public function updateRealDate()
  {
    $sql = "UPDATE praiseThumb SET num = num + 1 WHERE id=1";
    $this->updateDate($sql);
  }
}
$praiseCon=new realConn('127.0.0.1', 'root', 'w', 'homework');
$praiseCon->updateRealDate();
?>

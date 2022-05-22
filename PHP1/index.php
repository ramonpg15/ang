<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

include 'conexion.php';

$pdo = new Conexion();

//NECESITAMOS ENVIAR UNA RESPUESTA HTTP
//200-OK
//403-NO TIENES PERMISO
//404-NO EXISTE LO QUE ESTAS BUSCANDO

if($_SERVER['REQUEST_METHOD'] == 'GET'){

    if(isset($_GET['user'])){
        $sql = $pdo->prepare("SELECT * FROM user where user_30 =:user ");
        $sql->bindValue(":user", $_GET['user']);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
        exit;

    }else{
        if(isset($_GET['id'])){
            $sql = $pdo->prepare("SELECT * FROM `questions` where `id_question` =:id ");
            $sql->bindValue(":id", $_GET['id']);
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
        
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
            exit;
        }else{
            $sql = $pdo->prepare("SELECT * FROM questions");
            $sql->execute();
            $sql->setFetchMode(PDO::FETCH_ASSOC);
        
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll());
            exit;
        }
    }
}

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $datos = json_decode(file_get_contents('php://input'), true);

    try{
        $sql = "INSERT INTO `questions`(`id_question`, `question_200`, `answer1_200`, `answer2_200`, `answer3_200`, `status_10`)  VALUES (0,'".$datos['question']."','".$datos['res1']."','".$datos['res2']."','".$datos['res3']."','activo')";
    
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $idPost = $pdo->lastInsertId();
        header("HTTP/1.1 200 OK");
        //echo json_encode($idPost);
        echo json_encode(['insert' => true]);
        exit;
    }catch(PDOException $e){
        //header("HTTP/1.1 404 OK");
        echo json_encode(['insert' => false]);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'PUT'){
    $datos = json_decode(file_get_contents('php://input'), true);
    try{
        $sql = "UPDATE `questions` SET `question_200`='".$datos['question']."', `answer1_200`='".$datos['res1']."', `answer2_200`='".$datos['res2']."', `answer3_200`='".$datos['res3']."' WHERE `id_question` =".$datos['id']."";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode(['update' => true]);
        exit;
    }catch(PDOException $e){
        echo json_encode(['update' => false]);
        exit;
    }
    
}

if ($_SERVER['REQUEST_METHOD'] == 'DELETE'){
    $sql = "DELETE FROM `questions`  WHERE `id_question` =:id";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(":id", $_GET['id']);
    $stmt->execute();
        header("HTTP/1.1 200 OK");
        exit;
}
?>
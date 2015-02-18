<?php

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class AppController extends Controller
{
    /**
     * @Route("/dashboard", name="dashboard", methods={"GET"}, options={"expose"=true})
     */
    public function indexAction()
    {
        return $this->render('dashboard/dashboard.html.twig');
    }
}


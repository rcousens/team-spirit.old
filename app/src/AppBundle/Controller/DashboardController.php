<?php
/**
 * Created by IntelliJ IDEA.
 * User: ross
 * Date: 1/02/15
 * Time: 12:46 AM
 */

namespace AppBundle\Controller;


use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends Controller
{
    /**
     * @Route("/dashboard", name="dashboard", methods={"GET"}, options={"expose"=true})
     */
    public function indexAction()
    {
        $username = $this->get('security.context')->getToken()->getUsername();
        return $this->render('dashboard/index.html.twig', ['embed' => ['username' => $username]]);
    }
}
<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PartsController extends Controller
{
    /**
     * @Route("/parts/nav", name="parts_nav", options={"expose"=true})
     */
    public function navAction()
    {
        return $this->render('parts/nav/nav.html.twig');
    }

    /**
     * @Route("/parts/footer", name="parts_footer", options={"expose"=true})
     */
    public function footerAction()
    {
        return $this->render('parts/footer/footer.html.twig');
    }
}

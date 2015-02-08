<?php

namespace ApiBundle\Controller;

use JMS\Serializer\SerializationContext;
use Symfony\Component\Routing\Annotation\Route;
use FOS\RestBundle\Controller\FOSRestController;

/**
 * @Route("/api")
 *
 * Class ProfileController
 * @package ApiBundle\Controller
 */
class ProfileController extends FOSRestController
{

    /**
     * @Route("/me", name="api_me", options={"expose"=true})
     */
    public function meAction()
    {
        $data = ['me' => $this->getUser()];

        $view = $this->view($data, 200)
            ->setSerializationContext(SerializationContext::create()->setGroups(['private']))
            ->setFormat('json');

        sleep(6);
        return $this->handleView($view);
    }
}
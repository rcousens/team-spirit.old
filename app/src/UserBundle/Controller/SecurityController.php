<?php

namespace UserBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\SecurityContextInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use FOS\UserBundle\Controller\SecurityController as BaseController;

class SecurityController extends BaseController
{
    public function loginAction(Request $request)
    {
        if ($this->get('security.context')->isGranted('IS_AUTHENTICATED_REMEMBERED'))
        {
            // redirect authenticated users to homepage
            return $this->redirect($this->generateUrl('home'));
        }

        return parent::loginAction($request);
    }

    /**
     * Renders the login template with the given parameters. Overwrite this function in
     * an extended controller to provide additional data for the login template.
     *
     * @param array $data
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function renderLogin(array $data)
    {
        $data['register_csrf_token'] = $this->has('form.csrf_provider')
            ? $this->get('form.csrf_provider')->generateCsrfToken('registration')
            : null;

        return $this->render('FOSUserBundle:Security:login.html.twig', ['embed' => $data]);
    }

    /**
     * @Route("/login_check", name="security_check", methods={"POST"}, options={"expose"=true})
     */
    public function checkAction()
    {
        throw new \RuntimeException('You must configure the check path to be handled by the firewall using form_login in your security firewall configuration.');
    }

}

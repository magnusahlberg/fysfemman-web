import {Redirect} from 'aurelia-router';

export class App {
  configureRouter(config, router) {
    config.title = 'Fysfemman';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { route: ['', 'activities'], moduleId: 'activities', name: 'activities', auth: true},
      { route: 'login',  moduleId: 'login', name: 'login'}
    ]);

    this.router = router;
  }
}

class AuthorizeStep {
  isLoggedIn() {
    let token = localStorage.getItem("token");
    console.log("Token: " + token);
    return (token != null)
  }
  
  run(navigationInstruction, next) {
    if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
      if (this.isLoggedIn() == false) {
        return next.cancel(new Redirect('login'));
      }
    }

    return next();
  }
}
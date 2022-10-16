import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer  } from "@angular/platform-browser";
import { NavbarComponent } from './elements/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-test-angular-app';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private navBar: NavbarComponent,
    private router: Router,
  ){
    this.matIconRegistry.addSvgIcon(
      "email",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/social_email.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "linkedin",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/social_linkedin2.svg")
    );
    this.matIconRegistry.addSvgIcon(
      "github",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/social_github.svg")
    );
  }
}

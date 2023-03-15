import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  
  private isValidMathExpression(expr: string): boolean {
    //this regex will solve expressions like "3 + 2 + 4", "+3 + 2 + 4", "2 + 4", but not match expressions like "+3 + 2 + 4 +" or "3 + 2 + 4 +".
    const numberRegex = /^\s*(\+|-)?\d+(\s*[+*\/-]\s*(\+|-)?\d+)*\s*$/;

    if (numberRegex.test(expr)) {
      return true;
    }
    return false;
    // const senCosTgRegex = 
    // return numberRegex.test(expr);
  }
}

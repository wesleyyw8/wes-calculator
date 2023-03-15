import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private isValidMathExpression(expression: string): boolean {
    const operators = ['+', '-', '*', '/', 'sin', 'cos', 'tan'];
    const regex = /(?:\d+(\.\d+)?|[+\-*/()]|[a-z]+)/g;
    const stack = [];

    let match;
    while ((match = regex.exec(expression)) !== null) {
      const token = match[0];
      if (token === '(') {
        stack.push(token);
      } else if (token === ')') {
        if (stack.length === 0 || stack.pop() !== '(') {
          return false;
        }
      } else if (operators.includes(token)) {
        if (stack.length > 0 && stack[stack.length - 1] !== '(') {
          return false;
        }
      }
    } 
    return stack.length === 0 && !expression.endsWith('+') && !expression.endsWith('-')
  }
}

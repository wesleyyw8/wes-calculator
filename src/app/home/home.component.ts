import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private isValidMathExpression(expression: string = ''): boolean {
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
    return stack.length === 0 && !expression.trim().endsWith('+') && !expression.trim().endsWith('-')
  }

  private evaluateExpression(expression: string) {
    // Replace all instances of 'sin' and 'cos' with 'Math.sin' and 'Math.cos'
    expression = expression.replace(/sin/g, "Math.sin").replace(/cos/g, "Math.cos").replace(/tan/g, "Math.tan");
    
    // Use Function constructor to create a function from the expression
    const func = new Function(`return ${expression}`);
    
    // Call the function to get the result
    const result = func();
    
    return result;
  }
}

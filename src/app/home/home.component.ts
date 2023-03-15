import { Component, ElementRef, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public error: boolean = false;
  public expression = '';
  public results: Array<string> = [];
  public resultsHtml: String = '';
  public isLoading = false;

  constructor(private elementRef: ElementRef, private apiService: ApiService) { }

  ngOnInit(): void {
    
  }

  public calculatorOnClick(str: string): void {
    this.expression += str;
    this.validateExpression(this.expression);
  }

  public randomNumberOnClick() {
    this.isLoading = true;
    this.apiService.getRandomNumber()
    .pipe(
      catchError((error) => {
        console.error(error);
        return of('error');
        this.isLoading = false;
      })
    )
    .subscribe((num: any) => { //the type should be num over here. I dont know why my visual studio is complaing about it.
      this.expression = num;
      this.isLoading = false;
    });
  }

  public validateExpression(expression: string) {
    this.error = false;
    if (!expression.endsWith('=')) {
      return;
    }
    expression = expression.substring(0, expression.length -1);
    const result = this.evaluateExpression(expression);
    if (isNaN(result)) {
      this.error = true;
    } else {
      this.results.push(result);
      this.results = this.results.slice(-5);
      this.resultsHtml = this.results.join('\n');
    }
  }
  
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
    try {
      const func = new Function(`return ${expression}`);
      // Call the function to get the result
      const result = func();
      
      return result;
    } catch(error) {
      return error;
    }
    
  }
}

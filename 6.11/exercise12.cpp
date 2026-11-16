#include <cmath>
#include <iostream>

int main() {
    char operation;
    double a, b;
    std::cout << "Введите операцию (+ - * /) и два числа: ";
    if (!(std::cin >> operation >> a >> b)) return 1;
    switch (operation) {
        case '+': std::cout << a + b << '\n'; break;
        case '-': std::cout << a - b << '\n'; break;
        case '*': std::cout << a * b << '\n'; break;
        case '/':
            if (std::fabs(b) < 1e-9) std::cout << "Деление на ноль невозможно\n";
            else std::cout << a / b << '\n';
            break;
        default: std::cout << "Некорректная операция\n";
    }
}

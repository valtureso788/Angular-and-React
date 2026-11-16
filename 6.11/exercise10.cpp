#include <cmath>
#include <iostream>

int main() {
    double a, b;
    std::cout << "Введите два вещественных числа: ";
    if (!(std::cin >> a >> b)) return 1;
    if (std::fabs(a - b) < 1e-9) std::cout << "Числа равны\n";
    else if (a > b) std::cout << "Первое число больше\n";
    else std::cout << "Второе число больше\n";
}

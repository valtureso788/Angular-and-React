#include <iostream>

int main() {
    double a, b;
    std::cout << "Введите два числа: ";
    if (!(std::cin >> a >> b)) return 1;

    const double ternaryMax = a > b ? a : b;
    std::cout << "Максимум (тернарный оператор): " << ternaryMax << '\n';

    double ifMax;
    if (a > b) ifMax = a;
    else if (b > a) ifMax = b;
    else ifMax = a;
    std::cout << "Максимум (if-else): " << ifMax << '\n';
}

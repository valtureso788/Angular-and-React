#include <iostream>

int main() {
    double a, b, c;
    std::cout << "Введите три числа: ";
    if (!(std::cin >> a >> b >> c)) return 1;

    double ifMax;
    if (a >= b) {
        if (a >= c) ifMax = a;
        else ifMax = c;
    } else {
        if (b >= c) ifMax = b;
        else ifMax = c;
    }

    const double ternaryMax = a >= b
        ? (a >= c ? a : c)
        : (b >= c ? b : c);
    std::cout << "Максимум (if-else): " << ifMax << '\n';
    std::cout << "Максимум (тернарный): " << ternaryMax << '\n';
}

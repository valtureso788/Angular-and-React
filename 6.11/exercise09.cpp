#include <iostream>

int main() {
    int a, b;
    std::cout << "Введите целые a и b: ";
    if (!(std::cin >> a >> b)) return 1;
    const bool divisible = b != 0 && a % b == 0;
    std::cout << (divisible ? "Делится нацело\n" : "Не делится нацело\n");
}

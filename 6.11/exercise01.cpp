#include <iostream>

int main() {
    int number;
    std::cout << "Введите целое число: ";
    if (!(std::cin >> number)) return 1;

    if (number > 0) std::cout << "Положительное\n";
    else if (number < 0) std::cout << "Отрицательное\n";
    else std::cout << "Ноль\n";
}

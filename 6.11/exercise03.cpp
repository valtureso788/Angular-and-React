#include <iostream>

int main() {
    int number;
    std::cout << "Введите целое число: ";
    if (!(std::cin >> number)) return 1;
    if (number % 2 == 0) std::cout << "Чётное\n";
    else std::cout << "Нечётное\n";
}

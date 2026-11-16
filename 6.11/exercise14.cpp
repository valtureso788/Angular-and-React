#include <iostream>

int main() {
    int number;
    std::cout << "Введите целое число: ";
    if (!(std::cin >> number)) return 1;
    if (number == 0) {
        std::cout << "ноль\n";
    } else {
        const char* description = number > 0
            ? (number % 2 == 0 ? "положительное чётное" : "положительное нечётное")
            : (number % 2 == 0 ? "отрицательное чётное" : "отрицательное нечётное");
        std::cout << description << '\n';
    }
}

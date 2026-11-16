#include <iostream>

int main() {
    int year;
    std::cout << "Введите год: ";
    if (!(std::cin >> year)) return 1;
    const bool leap = (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
    std::cout << (leap ? "Високосный год\n" : "Не високосный год\n");
}

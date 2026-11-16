#include <iostream>

int main() {
    int day;
    std::cout << "Введите день недели (1–7): ";
    if (!(std::cin >> day)) return 1;
    switch (day) {
        case 1: case 2: case 3: case 4: case 5:
            std::cout << "Рабочий день\n";
            break;
        case 6: case 7:
            std::cout << "Выходной\n";
            break;
        default:
            std::cout << "Некорректный номер дня\n";
    }
}

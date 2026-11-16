#include <iostream>

int main() {
    int score;
    std::cout << "Введите баллы (0–100): ";
    if (!(std::cin >> score)) return 1;
    if (score < 0 || score > 100) std::cout << "Некорректный диапазон\n";
    else if (score >= 90) std::cout << "A\n";
    else if (score >= 80) std::cout << "B\n";
    else if (score >= 70) std::cout << "C\n";
    else if (score >= 60) std::cout << "D\n";
    else std::cout << "F\n";
}

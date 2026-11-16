#include <iostream>

int main() {
    int x;
    unsigned int y;
    std::cout << "Введите int x и unsigned int y: ";
    if (!(std::cin >> x >> y)) return 1;

    const bool correct = static_cast<long long>(x) < static_cast<long long>(y);
    const bool naive = x < y;
    std::cout << "Сравнение после приведения к long long: " << std::boolalpha << correct << '\n';
    std::cout << "Наивное сравнение x < y: " << naive << '\n';
    // При x=-1 и y=1 наивное сравнение обычно преобразует -1 в unsigned,
    // получая большое положительное число; signed-сравнение даёт -1 < 1.
}

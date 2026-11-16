#include <iostream>

int main() {
    int age, hasStudentCard;
    std::cout << "Введите возраст и наличие студенческого билета (1/0): ";
    if (!(std::cin >> age >> hasStudentCard)) return 1;
    const bool discount = age >= 65 || (hasStudentCard == 1 && age < 25);
    std::cout << (discount ? "Скидка положена\n" : "Скидка не положена\n");
}

#include <cctype>
#include <iostream>

int main() {
    char ch;
    std::cout << "Введите один символ: ";
    if (!(std::cin >> ch)) return 1;
    switch (ch) {
        case 'a': case 'A': case 'e': case 'E': case 'i': case 'I':
        case 'o': case 'O': case 'u': case 'U':
            std::cout << "Гласная\n";
            break;
        default:
            if (std::isalpha(static_cast<unsigned char>(ch))) std::cout << "Согласная\n";
            else std::cout << "Не буква\n";
    }
}

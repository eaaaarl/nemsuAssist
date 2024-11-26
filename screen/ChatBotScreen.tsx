import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Image
} from 'react-native';
import { chatbotData } from '../data/chatbotData';

interface Message {
    id: string;
    text: string;
    isBot: boolean;
}

// Helper function to calculate string similarity (Levenshtein distance)
const calculateSimilarity = (str1: string, str2: string): number => {
    const track = Array(str2.length + 1).fill(null).map(() =>
        Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
        track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
        track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
        for (let i = 1; i <= str1.length; i += 1) {
            const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
            track[j][i] = Math.min(
                track[j][i - 1] + 1,
                track[j - 1][i] + 1,
                track[j - 1][i - 1] + indicator
            );
        }
    }
    return 1 - (track[str2.length][str1.length] / Math.max(str1.length, str2.length));
}

// Extract keywords from input
const extractKeywords = (input: string): string[] => {
    const stopWords = ['what', 'where', 'when', 'who', 'how', 'is', 'are', 'the', 'to', 'in', 'at', 'on', 'for'];
    return input
        .toLowerCase()
        .split(' ')
        .filter(word => !stopWords.includes(word) && word.length > 2);
}

// Find the best matching response with context
const findResponse = (input: string, data: any): string => {
    input = input.toLowerCase().trim();
    const keywords = extractKeywords(input);
    let bestMatch = {
        similarity: 0,
        response: '',
        context: ''
    };

    // Helper function to check patterns
    const checkPatterns = (patterns: string[], responses: string[], context: string) => {
        // Direct pattern match
        const directMatch = patterns.some(pattern => input.includes(pattern));
        if (directMatch) {
            return {
                similarity: 1,
                response: responses[Math.floor(Math.random() * responses.length)],
                context
            };
        }

        // Keyword matching
        let maxSimilarity = 0;
        patterns.forEach(pattern => {
            const patternKeywords = extractKeywords(pattern);
            let matchCount = 0;
            keywords.forEach(keyword => {
                patternKeywords.forEach(patternKeyword => {
                    const similarity = calculateSimilarity(keyword, patternKeyword);
                    if (similarity > 0.8) matchCount++;
                });
            });
            const similarity = matchCount / Math.max(keywords.length, patternKeywords.length);
            if (similarity > maxSimilarity) {
                maxSimilarity = similarity;
            }
        });

        if (maxSimilarity > bestMatch.similarity) {
            return {
                similarity: maxSimilarity,
                response: responses[Math.floor(Math.random() * responses.length)],
                context
            };
        }
        return null;
    };

    // Search through all sections
    const searchSection = (section: any, context: string) => {
        if (Array.isArray(section)) {
            section.forEach(item => {
                if (item.patterns && item.responses) {
                    const match = checkPatterns(item.patterns, item.responses, context);
                    if (match && match.similarity > bestMatch.similarity) {
                        bestMatch = match;
                    }
                }
            });
        } else if (section.patterns && section.responses) {
            const match = checkPatterns(section.patterns, section.responses, context);
            if (match && match.similarity > bestMatch.similarity) {
                bestMatch = match;
            }
        }
    };

    // Search through all data sections
    searchSection(data.general_info.administration, 'Administration');
    searchSection(data.general_info.office_hours, 'Office Hours');
    searchSection(data.offices_and_departments.registrar, 'Registrar');
    searchSection(data.offices_and_departments.cashier, 'Cashier');
    searchSection(data.academic_departments.CS_department, 'Computer Science Department');
    searchSection(data.academic_departments.education_department, 'Education Department');
    searchSection(data.facilities.library, 'Library');
    searchSection(data.facilities.computer_laboratories, 'Computer Laboratories');
    searchSection(data.contact_information, 'Contact Information');

    // If no good match is found, provide a helpful response
    if (bestMatch.similarity < 0.3) {
        const suggestions = [
            "I'm not quite sure about that. You might want to try asking about:",
            "• Office locations (registrar, cashier, admin office)",
            "• Department information (IT, Education)",
            "• Facilities (library, computer labs)",
            "• Contact numbers and office hours",
            "• Campus administration",
            "\nCould you please rephrase your question or choose from these topics?"
        ].join('\n');
        return suggestions;
    }

    // If medium confidence, add a clarifying note
    if (bestMatch.similarity < 0.7) {
        return `Based on your question about ${bestMatch.context}:\n\n${bestMatch.response}\n\nIs this what you were looking for? Feel free to ask for more specific information.`;
    }

    return bestMatch.response;
};

export default function ChatBotScreen() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your NEMSU LC assistant. How can I help you today?\n\nYou can ask me about:\n• Campus facilities and offices\n• Department information\n• Contact numbers\n• Office hours",
            isBot: true,
        },
    ]);
    const [inputText, setInputText] = useState('');
    const scrollViewRef = useRef<ScrollView>(null);

    // Auto scroll to bottom when new messages arrive
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const sendMessage = () => {
        if (inputText.trim() === '') return;

        // Add user message
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            isBot: false,
        };

        // Get bot response
        const botResponse = findResponse(inputText, chatbotData);
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            isBot: true,
        };

        setMessages(prev => [...prev, userMessage, botMessage]);
        setInputText('');
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Image
                    source={require('../assets/nemsu-logo.png')} // Make sure to add this image
                    style={styles.headerLogo}
                />
                <Text style={styles.headerTitle}>NEMSU LC Assistant</Text>
                <View style={styles.onlineIndicator} />
            </View>

            <ScrollView
                ref={scrollViewRef}
                style={styles.messagesContainer}
                contentContainerStyle={styles.messagesContent}
            >
                {messages.map((message) => (
                    <View key={message.id} style={styles.messageRow}>
                        {message.isBot && (
                            <Image
                                source={require('../assets/bot.png')} // Add bot avatar image
                                style={styles.avatar}
                            />
                        )}
                        <View
                            style={[
                                styles.messageBubble,
                                message.isBot ? styles.botBubble : styles.userBubble,
                            ]}
                        >
                            <Text style={[
                                styles.messageText,
                                message.isBot ? styles.botText : styles.userText,
                            ]}>
                                {message.text}
                            </Text>
                        </View>
                        {!message.isBot && (
                            <Image
                                source={require('../assets/user-avatar.png')} // Add user avatar image
                                style={styles.avatar}
                            />
                        )}
                    </View>
                ))}
            </ScrollView>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.inputContainer}
            >
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={setInputText}
                    placeholder="Ask me about NEMSU LC..."
                    placeholderTextColor="#666"
                    multiline
                    onSubmitEditing={sendMessage}
                />
                <TouchableOpacity
                    style={[
                        styles.sendButton,
                        !inputText.trim() && styles.sendButtonDisabled
                    ]}
                    onPress={sendMessage}
                    disabled={!inputText.trim()}
                >
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#003366', // NEMSU blue
        borderBottomWidth: 1,
        borderBottomColor: '#002347',
    },
    headerLogo: {
        width: 32,
        height: 32,
        marginRight: 8,
        borderRadius: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#ffffff',
    },
    onlineIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginLeft: 8,
    },
    messagesContainer: {
        flex: 1,
    },
    messagesContent: {
        padding: 16,
    },
    messageRow: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginBottom: 12,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginHorizontal: 8,
    },
    messageBubble: {
        maxWidth: '70%', // Reduced to accommodate avatars
        padding: 12,
        borderRadius: 16,
        elevation: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    botBubble: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#e1e1e1',
        marginRight: 'auto',
    },
    userBubble: {
        backgroundColor: '#003366', // NEMSU blue
        marginLeft: 'auto',
    },
    messageText: {
        fontSize: 16,
        lineHeight: 20,
    },
    botText: {
        color: '#1a1a1a',
    },
    userText: {
        color: '#ffffff',
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e1e1e1',
    },
    input: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        fontSize: 16,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: '#003366', // NEMSU blue
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#cccccc',
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});
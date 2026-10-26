
import { ScrollView, Text, View } from "react-native";

const leads = [
  {
    id: "1",
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "+91 98765 43210",
    time: "Today, 10:30 AM",
  },
  {
    id: "2",
    name: "Priya Verma",
    email: "priya@gmail.com",
    phone: "+91 98765 12345",
    time: "Today, 10:15 AM",
  },
  {
    id: "3",
    name: "Rohan Mehta",
    email: "rohan@gmail.com",
    phone: "+91 98765 67890",
    time: "Yesterday, 6:45 PM",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-5 pt-16 pb-8">
        {/* Header */}
        <Text className="text-2xl font-bold text-gray-900">
          Meta Leads
        </Text>
        <Text className="mt-1 text-sm text-gray-500">
          Manage your incoming leads
        </Text>

        {/* Total leads */}
        <View className="mt-7 rounded-xl border border-gray-200 bg-white p-5">
          <Text className="text-sm text-gray-500">
            Total Leads
          </Text>
          <Text className="mt-2 text-3xl font-bold text-gray-900">
            {leads.length}
          </Text>
          <Text className="mt-2 text-sm text-blue-600">
            Sample data
          </Text>
        </View>

        {/* Leads list */}
        <View className="mt-8">
          <Text className="mb-4 text-lg font-semibold text-gray-900">
            Recent Leads
          </Text>

          {leads.map((lead) => (
            <View
              key={lead.id}
              className="mb-3 rounded-xl border border-gray-200 bg-white p-4"
            >
              <Text className="text-base font-semibold text-gray-900">
                {lead.name}
              </Text>

              <Text className="mt-2 text-sm text-gray-600">
                {lead.email}
              </Text>

              <Text className="mt-1 text-sm text-gray-600">
                {lead.phone}
              </Text>

              <View className="mt-3 border-t border-gray-100 pt-3">
                <Text className="text-xs text-gray-400">
                  Submitted: {lead.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
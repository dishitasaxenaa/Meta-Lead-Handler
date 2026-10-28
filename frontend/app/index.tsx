import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { io } from "socket.io-client";

export default function HomeScreen() {
  const [leads, setLeads] = useState<any[]>([]);

  useEffect(() => {
    const socket = io("http://192.168.1.4:5001");
    
    socket.on("initial-leads", (data) => {
      setLeads(data);
    });
  
    socket.on("new-lead", (lead) => {
      setLeads((currentLeads) => [...currentLeads, lead]);
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);
  
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
            <View key={lead.leadgen_id} className="mb-3 rounded-xl border border-gray-200 bg-white p-4">
              <Text className="text-base font-semibold text-gray-900">Lead ID: {lead.leadgen_id}</Text>
              <Text className="mt-2 text-sm text-gray-600">Form ID: {lead.form_id}</Text>
              <Text className="mt-1 text-sm text-gray-600">Page ID: {lead.page_id}</Text>
              <View className="mt-3 border-t border-gray-100 pt-3">
                <Text className="text-xs text-gray-400">Submitted: {lead.time}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text,StatusBar,TouchableOpacity} from 'react-native';
import { SafeAreaView, } from 'react-native-safe-area-context';

export default function SubscriptionScreen ()  {
  const router = useRouter();
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#0c0c24'}}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#1e1e1e"}></StatusBar>
      
      <View style={{ flex:1, backgroundColor:"#13151F",padding:20,justifyContent:'center',}}>
        <Text style={{fontSize:24, fontWeight:'bold',color:"#ffffff",marginBottom:10,textAlign:'center',marginTop:100}}>Start streaming today</Text>
        <Text style={{color:'lightgrey',fontSize:12,textAlign:'center',marginBottom:100}}>Cancel at any time, effective at the end of the payment {'\n'} period.</Text>
        <Text style={{color:'lightgrey',fontSize:12,textAlign:'left',marginLeft:20,marginTop:100}}>By selecting the monthly or annual subscription button {'\n'} 
          below, you are agreeing to start your subscription {'\n'}
          immediately, and you will not be able to withdraw from the {'\n'}
          contract or recieve a refund.You willbe charged the {'\n'}
          monthly or annual fee on a recuring basis.You can cancel {'\n'}
          at any time, effective at the end of the payment period.No{'\n'} refunds or credits wil be given for partial months of the year</Text>
      <TouchableOpacity onPress={() => alert('Custom Button pressed')} style={{backgroundColor:'#1f80e0',paddingVertical:12,paddingHorizontal:12,borderRadius:10,alignItems:'center',marginTop:20}}>
        <Text style={{color:"#fff",fontSize:16,fontWeight:'bold'}}>$11.99 / month</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={() => alert('Custom Button pressed')} style={{backgroundColor:'#1f80e0',paddingVertical:12,paddingHorizontal:12,borderRadius:10,alignItems:'center',marginTop:20,}}>
        <Text style={{color:"#fff",fontSize:16,fontWeight:'bold'}}>$144.99 / year</Text>
      </TouchableOpacity>
      <Text style={{textAlign:'center',color:'lightgrey',fontSize:12,marginTop:10  }}>(12 months $10.00. Save over 15%)</Text>
      <TouchableOpacity style={{backgroundColor:'#1f80e0',paddingVertical:12,paddingHorizontal:12,borderRadius:10,alignItems:'center',marginTop:20}}  onPress={() => router.push('/login')}>
        <Text style={{color:"#fff",fontSize:16,fontWeight:'bold'}}>Go to Home screen</Text>
      </TouchableOpacity>
    </View>
     

      {/* <Text>Welcome to DisneyClone</Text>
      <Text>This is your new home screen!</Text> */}
    </SafeAreaView>    
  );
};



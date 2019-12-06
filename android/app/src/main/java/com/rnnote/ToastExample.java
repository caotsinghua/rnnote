package com.rnnote;

import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.HashMap;
import java.util.Map;

public class ToastExample extends ReactContextBaseJavaModule{

    private static ReactApplicationContext reactContext;
    private  static  final String DURATION_SHORT_KET="SHORT";
    private static final  String DURATION_LONG_KEY="LONG";


    @NonNull
    @Override
    public String getName() {
        return "ToastExample";
    }

    public ToastExample(ReactApplicationContext reactContext){
        super(reactContext);
        this.reactContext=reactContext;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String,Object> constants=new HashMap<>();
        constants.put(DURATION_LONG_KEY,Toast.LENGTH_LONG);
        constants.put(DURATION_SHORT_KET,Toast.LENGTH_SHORT);
        return constants;
    }

    @ReactMethod
    public void  show(String message,int duration){

        Toast.makeText(getReactApplicationContext(),message,duration).show();
    }
}

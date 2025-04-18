package com.davidcopano.storybookmarks;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.community.facebooklogin.FacebookLogin;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

import java.util.ArrayList;

public class MainActivity extends BridgeActivity {
   @Override
     public void onCreate(Bundle savedInstanceState) {
         super.onCreate(savedInstanceState);

        registerPlugin(FacebookLogin.class);
        registerPlugin(GoogleAuth.class);
     }
}

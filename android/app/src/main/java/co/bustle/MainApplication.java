package co.bustleapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.facebook.react.PackageList;
import com.facebook.FacebookSdk;
import com.facebook.appevents.AppEventsLogger;

import com.facebook.reactnative.androidsdk.FBSDKPackage;

import com.wix.reactnativeuilib.highlighterview.HighlighterViewPackage;
import com.wix.reactnativeuilib.textinput.TextInputDelKeyHandlerPackage;
import com.wix.reactnativeuilib.wheelpicker.WheelPickerPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.reactcommunity.rndatetimepicker.RNDateTimePickerPackage;

import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // additional non auto detected packages can still be added here:

      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FacebookSdk.sdkInitialize(getApplicationContext());
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}

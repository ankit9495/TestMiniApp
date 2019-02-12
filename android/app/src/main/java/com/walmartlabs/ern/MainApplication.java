package com.walmartlabs.ern;

import android.app.Application;

import com.walmartlabs.ern.container.ElectrodeReactContainer;
import com.walmartlabs.ern.RunnerConfig;
import com.walmartlabs.ern.container.plugins.CodePushPlugin;

public class MainApplication extends Application {

  @Override
  public void onCreate() {
    super.onCreate();

    ElectrodeReactContainer.initialize(
            this,
            new ElectrodeReactContainer.Config().isReactNativeDeveloperSupport(RunnerConfig.RN_DEV_SUPPORT_ENABLED),
            new CodePushPlugin.Config("v1IYt0dNe9hVbY7BULMPIAGdLTzT4a9b7d8f-80d4-459f-b625-566c1ae80af1")
            /* Add your additional plugins configuration here */);
  }

}

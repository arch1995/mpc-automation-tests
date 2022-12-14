import { ADAPTER_EVENTS, CHAIN_NAMESPACES, SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { Web3AuthCore } from "@web3auth/core";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useEffect, useState } from "react";

// import { Auth } from "aws-amplify";
// import { useState } from "react";
import { generateIdToken } from "../../helper/utils";
// import { useWeb3Auth } from "../services/web3auth";

function Openlogin() {
  const [web3AuthInstance, setWeb3AuthInstance] = useState<Web3AuthCore | null>(null);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [provider, setProvider] = useState<null | SafeEventEmitterProvider>(null);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const subscribeAuthEvents = (web3auth: Web3AuthCore) => {
      // Can subscribe to all ADAPTER_EVENTS and LOGIN_MODAL_EVENTS
      web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: unknown) => {
        console.log("Yeah!, you are successfully logged in", data);
        setProvider(web3auth.provider);
      });

      web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
        console.log("connecting");
      });

      web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
        console.log("disconnected");
      });

      web3auth.on(ADAPTER_EVENTS.ERRORED, (error: Error) => {
        console.error("some error or user has cancelled login request", error);
      });
    };

    const initializeWeb3Auth = async () => {
      setIsLoading(true);
      const web3auth = new Web3AuthCore({
        chainConfig: {
          displayName: "Ethereum Mainnet",
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x1",
          blockExplorer: "https://etherscan.io/",
          ticker: "ETH",
          tickerName: "Ethereum",
        },
        clientId: "BGf4o9kWm4o6LE69EbwcezpxoimRO1ac5x8i-wnQKvFzL_IMFQji6rm0gBJJRyujk6uvmC4hw1PFbLIJtabsgO0",
      });
      const adapter = new OpenloginAdapter({
        adapterSettings: {
          network: "testnet",
          uxMode: "redirect",
          loginConfig: {
            jwt: {
              name: "Custom fake passwordless login",
              verifier: "torus-test-health",
              typeOfLogin: "jwt",
              // use your app client id you will get from aws cognito app
              clientId: "torus-key-test",
            },
          },
        },
      });
      subscribeAuthEvents(web3auth);
      web3auth.configureAdapter(adapter);
      await web3auth.init();
      setIsLoading(false);
      setWeb3AuthInstance(web3auth);
    };

    initializeWeb3Auth();
  }, []);

  const login = async (token: string) => {
    if (!web3AuthInstance) {
      console.error("web3auth not initialized, please wait....");
      return;
    }

    const localProvider = await web3AuthInstance.connectTo(WALLET_ADAPTERS.OPENLOGIN, {
      loginProvider: "jwt",
      extraLoginOptions: {
        // this is domain of your app created in aws
        domain: "https://test.example.com",
        // the param/field which you are going to verify from aws cognito
        verifierIdField: "email",
        id_token: token,
      },
    });

    if (localProvider) setProvider(localProvider);
  };

  const testlogin = async () => {
    const token = generateIdToken(userEmail, "ES256");
    const result = await login(token);
    console.log("result", result);
  };

  const logout = async () => {
    if (provider && web3AuthInstance) {
      await web3AuthInstance.logout();
      setProvider(null);
    }
  };

  const unloggedInView = (
    <div>
      <input className="openlogin-input-text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
      <button onClick={testlogin} className="login-with-openlogin">
        Login with Openlogin
      </button>
    </div>
  );

  if (loading) return <div>Loading....</div>;

  if (provider) {
    return (
      <div className="logged-in-state">
        Loggged in with Openlogin
        <button className="log-out-cta" onClick={logout}>
          Log out
        </button>
      </div>
    );
  }

  return unloggedInView;
}

export default Openlogin;

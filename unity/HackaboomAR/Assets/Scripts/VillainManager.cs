using System.Collections;
using System.Collections.Generic;
using SimpleJSON;
using UnityEngine;
using UnityEngine.Networking;
using Vuforia;

public class VillainManager : MonoBehaviour {

	// Use this for initialization
	[TextArea]
	public string testString;
	public Villain[] villainMarkers;
	private void OnVuforiaStarted()
	{
		CameraDevice.Instance.SetFocusMode(
			CameraDevice.FocusMode.FOCUS_MODE_CONTINUOUSAUTO);
	}
	void Start () {
		var vuforia = VuforiaARController.Instance;
		vuforia.RegisterVuforiaStartedCallback(OnVuforiaStarted);
		StartCoroutine(UpdateData());
	}
	IEnumerator UpdateData()
	{
		string myJSONString = "{}";
		while (true)
		{
			UnityWebRequest www = UnityWebRequest.Get("http://206.189.168.177:3000/villains/withMarker");
			yield return www.SendWebRequest();

			if (www.isNetworkError || www.isHttpError)
			{
				Debug.Log(www.error);
			}
			else
			{
				myJSONString = www.downloadHandler.text;
			}
			Debug.Log(myJSONString);
			//myJSONString = testString;
			JSONNode villainData = JSON.Parse(myJSONString);
			foreach (Villain vil in villainMarkers)
			{
				vil.isMarkerUsed = false;
				var uianch = vil.GetComponentInChildren<UIAnchor>();
				if (uianch != null && uianch.UI != null)
				{
					var ui = uianch.UI.GetComponentsInChildren<Renderer>(true);
					foreach (var component in ui)
						component.enabled = false;
				}
			}
			foreach (JSONNode v in villainData)
			{
				int markerID = v["markerid"];
				Debug.Log(v["name"]);
				if (markerID > 6 || markerID < 1) continue;
				var uianch = villainMarkers[markerID - 1].GetComponentInChildren<UIAnchor>();
				if (uianch != null && uianch.UI != null)
				{
					villainMarkers[markerID - 1].isMarkerUsed = true;
					if (villainMarkers[markerID - 1].GetComponent<DefaultTrackableEventHandler>().seen)
					{
						var ui = uianch.UI.GetComponentsInChildren<Renderer>(true);
						foreach (var component in ui)
							component.enabled = true;
					}
				}
				StartCoroutine(villainMarkers[markerID - 1].SetVillainData(v["name"], v["description"], v["imageid"]));
			}
			yield return new WaitForSeconds(5f);
		}	
	}
	void Update () {
		
	}
}

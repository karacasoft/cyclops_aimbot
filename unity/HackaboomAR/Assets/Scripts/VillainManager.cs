using System.Collections;
using System.Collections.Generic;
using SimpleJSON;
using UnityEngine;
using UnityEngine.Networking;

public class VillainManager : MonoBehaviour {

	// Use this for initialization
	
	public Villain[] villainMarkers;
	void Start () {
		StartCoroutine(UpdateData());
	}
	IEnumerator UpdateData()
	{
		string JSONString = "{}";
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
				JSONString = www.downloadHandler.text;
			}
			Debug.Log(JSONString);

			JSONNode villainData = JSON.Parse(JSONString);
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
					var ui = uianch.UI.GetComponentsInChildren<Renderer>(true);
					foreach (var component in ui)
						component.enabled = true;
				}
				StartCoroutine(villainMarkers[markerID - 1].SetVillainData(v["name"], v["description"], v["imageid"]));
			}
			yield return new WaitForSeconds(5f);
		}	
	}
	void Update () {
		
	}
}

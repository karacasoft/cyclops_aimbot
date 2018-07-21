using System.Collections;
using System.Collections.Generic;
using SimpleJSON;
using System.IO;
using UnityEngine;

public class VillainManager : MonoBehaviour {

	// Use this for initialization
	
	public Villain[] villainMarkers;
	void Start () {
		string path = "Assets/Resources/data.json";

		//Read the text from directly from the test.txt file
		StreamReader reader = new StreamReader(path);
		string JSONString = reader.ReadToEnd();
		Debug.Log(JSONString);
		reader.Close();

		JSONNode villainData = JSON.Parse(JSONString);
		foreach (JSONNode v in villainData.Children)
		{
			int markerID = v["markerid"];
			if (markerID > 6 || markerID < 1) continue;
			Debug.Log(v["description"]);
			StartCoroutine(villainMarkers[markerID-1].SetVillainData(v["name"], v["description"], v["imageurl"]));
		}
	}
	
	// Update is called once per frame
	void Update () {
		
	}
}

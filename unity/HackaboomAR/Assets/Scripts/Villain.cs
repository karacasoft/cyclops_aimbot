using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Villain : MonoBehaviour {

	public bool isMarkerUsed=false;
	public TextMesh nameTM,descTM;
	public SpriteRenderer imageSR;
	string vName,vDesc;
	Sprite vImage;
	public IEnumerator SetVillainData(string vName,string description,int imageid)
	{
		this.vName = vName;
		this.vDesc = description;
		string imageurl = "http://206.189.168.177:3000/images/" + imageid;
		Debug.Log(imageurl);
		using (WWW www = new WWW(imageurl))
		{
			// Wait for download to complete
			yield return www;
			Texture2D tex = (Texture2D)Instantiate(www.texture);
			TextureScale.Bilinear(tex, 50, 50);
			vImage = Sprite.Create(tex, new Rect(0, 0, tex.width, tex.height), new Vector2(0, 0));
		}
		UpdateUI();
	}
	void UpdateUI()
	{
		nameTM.text = ResolveTextSize(vName, 10);
		imageSR.sprite = vImage;
		descTM.text = ResolveTextSize(vDesc,30);
		Debug.Log("Updated UI.");
	}

	private string ResolveTextSize(string input, int lineLength)
	{

		// Split string by char " "         
		string[] words = input.Split(" "[0]);

		// Prepare result
		string result = "";

		// Temp line string
		string line = "";

		// for each all words        
		foreach (string s in words)
		{
			// Append current word into line
			string temp = line + " " + s;

			// If line length is bigger than lineLength
			if (temp.Length > lineLength)
			{

				// Append current line into result
				result += line + "\n";
				// Remain word append into new line
				line = s;
			}
			// Append current word into current line
			else
			{
				line = temp;
			}
		}

		// Append last line into result        
		result += line;

		// Remove first " " char
		return result.Substring(1, result.Length - 1);
	}
}

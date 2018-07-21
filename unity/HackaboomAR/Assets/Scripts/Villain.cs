using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Villain : MonoBehaviour {

	public int targetID;
	public TextMesh nameTM,descTM;
	public SpriteRenderer imageSR;
	string vName,vDesc;
	Sprite vImage;
	public IEnumerator SetVillainData(string vName,string description,int imageid)
	{
		this.vName = vName;
		this.vDesc = description;
		string imageurl = "http://206.189.168.177:3000/images" + imageid;
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
		nameTM.text = vName;
		imageSR.sprite = vImage;
		descTM.text = vDesc;
		Debug.Log("Updated UI.");
	}
}
